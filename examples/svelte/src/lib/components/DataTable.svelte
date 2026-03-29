<script lang="ts" generics="T extends Record<string, unknown>">
  import type { Snippet } from 'svelte'

  interface Column {
    key: keyof T
    header: string
    sortable?: boolean
    render?: (value: T[keyof T], row: T) => string
  }

  interface DataTableProps {
    columns: Column[]
    data: T[]
    pageSize?: number
    rowKey: keyof T
    children?: Snippet<{ row: T; column: Column; value: T[keyof T] }>
  }

  let { columns, data, pageSize = 10, rowKey, children }: DataTableProps = $props()

  let sortKey = $state<string | null>(null)
  let sortDirection = $state<'asc' | 'desc'>('asc')
  let currentPage = $state(1)

  let sortedData = $derived(() => {
    if (!sortKey) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortKey!]
      const bVal = b[sortKey!]

      if (aVal === bVal) return 0
      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1

      const comparison = aVal < bVal ? -1 : 1
      return sortDirection === 'asc' ? comparison : -comparison
    })
  })

  let paginatedData = $derived(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData().slice(start, start + pageSize)
  })

  let totalPages = $derived(Math.ceil(data.length / pageSize))

  function handleSort(key: string): void {
    if (sortKey === key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey = key
      sortDirection = 'asc'
    }
  }

  function nextPage(): void {
    if (currentPage < totalPages) {
      currentPage++
    }
  }

  function prevPage(): void {
    if (currentPage > 1) {
      currentPage--
    }
  }

  function goToPage(page: number): void {
    if (page >= 1 && page <= totalPages) {
      currentPage = page
    }
  }
</script>

<div class="data-table">
  <table>
    <thead>
      <tr>
        {#each columns as column (column.key)}
          <th
            class:sortable={column.sortable}
            onclick={() => column.sortable && handleSort(String(column.key))}
          >
            {column.header}
            {#if column.sortable && sortKey === column.key}
              <span class="sort-icon">
                {sortDirection === 'asc' ? ' ↑' : ' ↓'}
              </span>
            {/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each paginatedData() as row (String(row[rowKey]))}
        <tr>
          {#each columns as column (column.key)}
            <td>
              {#if children}
                {@render children({ row, column, value: row[column.key] })}
              {:else if column.render}
                {column.render(row[column.key], row)}
              {:else}
                {String(row[column.key] ?? '')}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  {#if totalPages > 1}
    <div class="pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onclick={prevPage}
      >
        Previous
      </button>
      {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page (page)}
        <button
          type="button"
          class="page-number"
          class:active={currentPage === page}
          onclick={() => goToPage(page)}
        >
          {page}
        </button>
      {/each}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onclick={nextPage}
      >
        Next
      </button>
    </div>
  {/if}
</div>

<style>
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
