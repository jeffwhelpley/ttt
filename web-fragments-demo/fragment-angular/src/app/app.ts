import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  protected readonly count = signal(0);
  protected readonly receivedMessage = signal<string | null>(null);

  private bc: BroadcastChannel | null = null;
  private readonly FRAGMENT_NAME = 'Angular';

  ngOnInit() {
    // Set up broadcast channel listener
    this.bc = new BroadcastChannel('/fragment-events');
    this.bc.addEventListener('message', this.handleMessage.bind(this));
  }

  ngOnDestroy() {
    // Clean up broadcast channel
    if (this.bc) {
      this.bc.close();
      this.bc = null;
    }
  }

  private handleMessage(event: MessageEvent) {
    const { type, source } = event.data;

    if (type === 'fragment_broadcast') {
      if (source !== this.FRAGMENT_NAME) {
        this.receivedMessage.set(`Event received from ${source}`);
      } else {
        this.receivedMessage.set(null);
      }
    }
  }

  broadcastEvent() {
    if (this.bc) {
      this.receivedMessage.set(null);
      this.bc.postMessage({
        type: 'fragment_broadcast',
        source: this.FRAGMENT_NAME,
      });
    }
  }

  increment() {
    this.count.update((c) => c + 1);
  }

  decrement() {
    this.count.update((c) => c - 1);
  }
}
