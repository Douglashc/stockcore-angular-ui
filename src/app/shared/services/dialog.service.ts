import { Injectable, Type, signal } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface DialogConfig {
    width?: string;
    data?: any;
}

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    public isOpen = signal<boolean>(false);
    public childComponent = signal<Type<any> | null>(null);
    public config = signal<DialogConfig>({});

    #afterClosed$ = new Subject<any>();

    open(component: Type<any>, config: DialogConfig = {}): { afterClosed: () => Observable<any> } {
        this.config.set({ width: '650px', ...config });
        this.childComponent.set(component);
        this.isOpen.set(true);
        console.log("Llego", component)
        // Reiniciamos el stream del cierre
        this.#afterClosed$ = new Subject<any>();

        return {
            afterClosed: () => this.#afterClosed$.asObservable()
        };
    }

    close(result?: any): void {
        this.isOpen.set(false);
        this.childComponent.set(null);
        this.#afterClosed$.next(result);
        this.#afterClosed$.complete();
    }
}