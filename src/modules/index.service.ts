import { Injectable } from '@nestjs/common';

type BuildResponseParams<T> = {
  page?: number;
  totalPages: number;
  result: T;
};

@Injectable()
export class PaginationService {
  static readonly DEFAULT_PAGE = 1;
  static readonly DEFAULT_LIMIT = 10;

  static readonly FIRST_PAGE = 1;
  static readonly NULL_VALUE: number | null = null;

  parsePageNumber(page?: string | number): number {
    return page && Number(page) > 0 ? Number(page) : PaginationService.DEFAULT_PAGE;
  }

  parseLimitNumber(limit?: string | number): number {
    return limit && Number(limit) > 0 ? Number(limit) : PaginationService.DEFAULT_LIMIT;
  }

  calculateNextPage(pageNumber: number, totalPages: number): number | null {
    return pageNumber < totalPages
      ? pageNumber + PaginationService.FIRST_PAGE
      : PaginationService.NULL_VALUE;
  }

  calculatePrevPage(pageNumber: number): number | null {
    return pageNumber > PaginationService.FIRST_PAGE
      ? pageNumber - PaginationService.FIRST_PAGE
      : PaginationService.NULL_VALUE;
  }

  buildResponse<T>({ page, totalPages, result }: BuildResponseParams<T>) {
    const nextPage = this.calculateNextPage(this.parsePageNumber(page), totalPages);
    const prevPage = this.calculatePrevPage(this.parsePageNumber(page));

    return {
      next: nextPage,
      prev: prevPage,
      totalPages,
      result,
    };
  }
}
