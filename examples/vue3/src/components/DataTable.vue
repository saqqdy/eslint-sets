<script setup lang="ts">
import { computed, ref, type Ref } from 'vue'

interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  pageSize?: number
  rowKey: keyof T
}

const props = withDefaults(defineProps<DataTableProps<Record<string, unknown>>>(), {
  pageSize: 10,
})

const sortKey: Ref<string | null> = ref(null)
const sortDirection: Ref<'asc' | 'desc'> = ref('asc')
const currentPage: Ref<number> = ref(1)

const sortedData = computed(() => {
  if (!sortKey.value) return props.data

  return [...props.data].sort((a, b) => {
    const aVal = a[sortKey.value!]
    const bVal = b[sortKey.value!]

    if (aVal === bVal) return 0
    if (aVal === null || aVal === undefined) return 1
    if (bVal === null || bVal === undefined) return -1

    const comparison = aVal < bVal ? -1 : 1
    return sortDirection.value === 'asc' ? comparison : -comparison
  })
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return sortedData.value.slice(start, start + props.pageSize)
})

const totalPages = computed(() => Math.ceil(props.data.length / props.pageSize))

function handleSort(key: string): void {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
}

function nextPage(): void {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage(): void {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function goToPage(page: number): void {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="String(column.key)"
            :class="{ sortable: column.sortable }"
            @click="column.sortable && handleSort(String(column.key))"
          >
            {{ column.header }}
            <span
              v-if="column.sortable && sortKey === column.key"
              class="sort-icon"
            >
              {{ sortDirection === 'asc' ? ' ↑' : ' ↓' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in paginatedData"
          :key="String(row[rowKey])"
        >
          <td
            v-for="column in columns"
            :key="String(column.key)"
          >
            <template v-if="column.render">
              {{ column.render(row[column.key], row) }}
            </template>
            <template v-else>
              {{ row[column.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="totalPages > 1"
      class="pagination"
    >
      <button
        type="button"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        Previous
      </button>
      <span
        v-for="page in totalPages"
        :key="page"
        class="page-number" :class="[{ active: currentPage === page }]"
        @click="goToPage(page)"
      >
        {{ page }}
      </span>
      <button
        type="button"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.data-table {
  width: 100%;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  border-bottom: 2px solid #ddd;
  padding: 12px;
  text-align: left;
}

th.sortable {
  cursor: pointer;
  user-select: none;
}

th.sortable:hover {
  background-color: #f5f5f5;
}

td {
  border-bottom: 1px solid #ddd;
  padding: 12px;
}

.pagination {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
}

.page-number {
  cursor: pointer;
  padding: 4px 8px;
}

.page-number.active {
  background-color: #42b883;
  border-radius: 4px;
  color: white;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
