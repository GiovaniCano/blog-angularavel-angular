import { ChangeDetectionStrategy, Component, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ModalsService } from '../modals.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'modal' }
})
export class ConfirmModalComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Confirm?'
  @Input() cancelText: string = 'Cancel'
  @Input() confirmText: string = 'Confirm'

  @HostListener('input.escape') escape() { this.cancel() }

  constructor(private _modalsService: ModalsService, private _render: Renderer2) { }

  cancel(): void {
    this._modalsService.confirmModal.next(false)
  }

  confirm(): void {
    this._modalsService.confirmModal.next(true)
  }

  ngOnInit(): void {
    this._render.addClass(document.body, 'no-scroll')
  }

  ngOnDestroy(): void {
    this._render.removeClass(document.body, 'no-scroll')
  }
}
