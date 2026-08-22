import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';

import { BoardStore } from '@core/stores/board.store';
import {
  DEFAULT_ICON,
  ICON_OPTIONS,
} from '@features/board-tasks/utils/board-layout.constants';
import {
  Board,
  BoardUpdates,
  BoardViewModel,
} from '@features/boards-overview/models/board.models';
import { PopoverModule } from 'primeng/popover';
import { PrimeButton } from '@shared/ui/prime-button/prime-button';

@Component({
  selector: 'app-board-header-details',
  imports: [PopoverModule, FormsModule, ReactiveFormsModule, PrimeButton],
  templateUrl: './board-header-details.html',
  styleUrl: './board-header-details.css',
})
export class BoardHeaderDetails {
  public readonly board = input.required<BoardViewModel>();

  private readonly boardStore = inject(BoardStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);

  protected editForm: FormGroup;
  protected iconFilter = signal<string>(''); //TODO make reactive with debounce

  protected iconOptions = computed(() => {
    const filter = this.iconFilter();
    return ICON_OPTIONS.filter((icon) => icon.includes(filter));
  });

  constructor() {
    this.editForm = this.createForm();
    this.setupActiveBoardSubscription();
    this.setupFormChangeSubscription();
  }

  protected pickRandomIcon(): void {
    const randomIndex = Math.floor(Math.random() * ICON_OPTIONS.length);
    this.updateBoard({ icon: ICON_OPTIONS[randomIndex] });
  }

  protected resetToDefaultIcon(): void {
    this.updateBoard({ icon: DEFAULT_ICON });
  }

  protected pickIcon(icon: string) {
    if (this.board().icon !== icon && !this.boardStore.isLoading())
      this.updateBoard({ icon });
  }

  protected updateBoard(updates: BoardUpdates): void {
    this.boardStore.updateBoard(this.board().id, updates);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      icon: [''],
      description: [''],
    });
  }

  private setupActiveBoardSubscription(): void {
    toObservable(this.board)
      .pipe(
        filter(
          (board): board is NonNullable<typeof board> => board !== undefined,
        ),
        distinctUntilChanged((a, b) => a?.id === b?.id),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((board) => {
        this.editForm.patchValue({
          title: board.title,
          icon: board.icon,
          description: board.description,
        });
        this.editForm.markAsPristine();
      });
  }

  private setupFormChangeSubscription(): void {
    this.editForm.valueChanges
      .pipe(
        debounceTime(1000),
        map((updates: Pick<Board, 'title' | 'description'>) => ({
          title: updates.title.trim(),
          description: updates.description.trim(),
        })),
        distinctUntilChanged((prev, curr) => this.areObjectsEqual(prev, curr)),
        tap((a) => console.log(a)),
        filter(() => this.editForm.dirty),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((updates: BoardUpdates) => {
        this.updateBoard(updates);
      });
  }

  private areObjectsEqual(obj1: unknown, obj2: unknown): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
}
