import { AIMemory } from './index';

/**
 * A memory class to store ai interactions
 * @export
 */
export class Memory implements AIMemory {
  private data: string[] = [];
  private sdata: Map<string, string[]>;
  private limit: number;

  constructor(limit: number = 50) {
    if (limit <= 0) {
      throw Error("argument 'last' must be greater than 0");
    }
    this.limit = limit;
  }

  add(text: string, sessionID?: string): void {
    const d = this.get(sessionID);
    d.push(text) > this.limit ? d.shift() : null;
  }

  history(sessionID?: string): string {
    return this.get(sessionID).reduce((a, v) => a + v, '');
  }

  peek(sessionID?: string): Readonly<string[]> {
    return this.get(sessionID);
  }

  private get(sessionID?: string): string[] {
    if (!sessionID) {
      return this.data;
    }

    if (!this.sdata) {
      this.sdata = new Map();
    }

    if (!this.sdata.has(sessionID)) {
      this.sdata.set(sessionID, []);
    }

    return this.sdata.get(sessionID);
  }
}
