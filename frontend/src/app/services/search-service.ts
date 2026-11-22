import { Injectable } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    public createSearchStream() {
        const searchSubject = new Subject<string>();

        return {
            search: searchSubject.asObservable().pipe(
                debounceTime(400),
                distinctUntilChanged()
            ),
            setSearch: (value: string) => searchSubject.next(value)
        };
    }
}