const VISIBLE_PAGES = 5;

const createPaginationArray = (number, leftPage, pageNumber) => _.concat({value: number - 1, view: 'Previous page'},
    Array.from({length: pageNumber}, (v, k) => ({value: leftPage + k, view: leftPage + k + 1})),
    {value: number + 1, view: 'Next page'});

export const createPaginationList = ({number, totalPages}) => {
    if (VISIBLE_PAGES > totalPages) {
        return createPaginationArray(number, 0, totalPages);
    }
    const leftShift = _.toNumber(VISIBLE_PAGES / 2);
    const leftPage = number - leftShift;
    if (leftPage < 0) {
        return createPaginationArray(number, 0, VISIBLE_PAGES);
    }
    if (leftPage + VISIBLE_PAGES >= totalPages) {
        return createPaginationArray(number, totalPages - VISIBLE_PAGES, VISIBLE_PAGES)
    }
    return createPaginationArray(number, leftPage, VISIBLE_PAGES);
};