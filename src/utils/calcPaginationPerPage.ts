export const calcPaginationPerPage = (totalItems: number, perPage: number) => {
    /**
     * Round up the result of the division of the total items by the number of items per page
     * to obtain the total number of pages per pagination
     */
    const totalPagination = Math.ceil( totalItems/perPage )
    return totalPagination;
}