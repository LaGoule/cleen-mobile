import { Component, ViewEncapsulation, isDevMode } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { merge, Observable, of, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ToastOptions } from '@ionic/core';
import { ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-updates-notification',
    template: `
        <div *ngIf="updateAvailable$|async"> </div>
    `,
    styles: [``],
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule],
    standalone: true,
})
export class UpdatesNotificationComponent {
    updateAvailable$: Observable<boolean | {}>;
    closed$ = new Subject<void>();

    constructor(
        private readonly _updates: SwUpdate,
        private readonly _toast: ToastController
    ) {
        console.log('Application updater install: ', isDevMode());
        this.updateAvailable$ = merge(
          of(false),
          this._updates.versionUpdates.pipe(
            filter((e) => e.type === 'VERSION_DETECTED'),
            map(async () => await this._displayNotif()),
            map(() => true)
          ),
          this.closed$.pipe(map(() => false))
        );
    }

    async activateUpdate() {
        if (isDevMode()) {
            return
        }
        await this._updates.activateUpdate()
        location.reload();
    }

    private async _displayNotif() {
        console.log('display notification...');
        const data = <ToastOptions>{
          message: 'Nouvelle mise à jours!',
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: `Update`,
        };
        const toast = await this._toast.create(data);
        await toast.present();
        await toast.onDidDismiss()
        this.activateUpdate();
      }
}