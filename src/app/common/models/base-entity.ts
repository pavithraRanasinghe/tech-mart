export class BaseEntity {

  constructor(data?: any) {
    if (data) {
      this.setValues(data);
    }
  }

  public setValues(data: any): BaseEntity {
    return Object.assign(this, data);
  }
}
