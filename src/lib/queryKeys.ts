export const postKeys = {
  all: ['posts'] as const,
  list: () => [...postKeys.all, 'list'] as const,
  paginated: (page: number, limit: number) =>
    [...postKeys.all, 'paginated', { page, limit }] as const,
  infinite: () => [...postKeys.all, 'infinite'] as const,
};
