/**
 * Copyright 2020 Vyasaka Technologies
 */

import { Component, OnInit } from "@angular/core";
import { BsModalRef, } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";

@Component({
  templateUrl: "./confirmation-modal.component.html"
})
export class ConfirmationModalComponent implements OnInit {
  public active: boolean = false;
  public body: string | undefined = undefined;
  public title: string | undefined = undefined;
  public onClose: Subject<boolean> = new Subject<boolean>();

  public constructor(private _bsModalRef: BsModalRef) {}

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public showConfirmationModal(title: string, body: string): void {
    this.active = true;
    this.title = title;
    this.body = body;
  }

  public onConfirm(): void {
    this.active = false;
    this.onClose.next(true);
    this._bsModalRef.hide();
  }

  public onCancel(): void {
    this.active = false;
    this.onClose.next(false);
    this._bsModalRef.hide();
  }

  public hideConfirmationModal(): void {
    this.active = false;
    this.onClose.next(undefined);
    this._bsModalRef.hide();
  }
}
