import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Movie } from '../../../interfaces/Movie';
import { MovieCard } from '../movie-card/movie-card';
import { Loading } from '../loading/loading';

@Component({
  imports: [Loading, MovieCard],
  selector: 'app-movie-list',
  styleUrl: './movie-list.scss',
  templateUrl: './movie-list.html',
})
export class MovieList implements AfterViewInit, OnDestroy {

  @ViewChild('movieList') movieList!: ElementRef<HTMLElement>;

  private intersectionObserver?: IntersectionObserver;
  private loadMoreElement?: HTMLElement;

  @ViewChild('loadMoreTrigger')
  set trigger(element: ElementRef<HTMLElement> | undefined) {
    this.loadMoreElement = element?.nativeElement;
    this.observeLoadMore();
  }

  @Output() columnsChange = new EventEmitter<number>();
  @Output() loadMore = new EventEmitter<void>();

  @Input() movies: Movie[] = [];
  @Input() loading = true;
  @Input() hasMore = true;
  @Input() link = '/movies';

  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.updateColumns();
    });

    this.resizeObserver.observe(this.movieList.nativeElement);

    this.intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        console.log('Достигли конца списка');
        this.loadMore.emit();
      }
    }, {
      rootMargin: '300px'
    });

    this.observeLoadMore();

    this.updateColumns();
  }

  private observeLoadMore(): void {
    this.intersectionObserver?.disconnect();

    if (this.loadMoreElement) {
      this.intersectionObserver?.observe(this.loadMoreElement);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
  }

  private updateColumns(): void {
    const container = this.movieList.nativeElement;
    const card = container.querySelector('.movie-list__card');

    if (!card) return;

    const containerWidth = container.clientWidth;
    const cardWidth = card.getBoundingClientRect().width;
    const gap = 24;

    const columns = Math.floor(
      (containerWidth + gap) / (cardWidth + gap)
    );

    this.columnsChange.emit(Math.max(1, columns));
  }
}