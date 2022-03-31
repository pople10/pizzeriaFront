// Product Tag
export type ProductTags = 'nike' | 'puma' | 'lifestyle' | 'caprese';

// Product Colors
export type ProductColor = 'white' | 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'gray' | 'orange' | 'pink';



export class Product {
  id?: number;
  title?: string;
  price?: number;
  photo?: string;
  description?: string;
  preparation_time_in_min?:number;
  availability?:boolean;
  state?:string;

  constructor(
    id?: number,
    title?: string,
    price?: number,
    photo?: string,
    description?: string,
    preparation_time_in_min?:number,
    availability?:boolean
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.photo = photo;
    this.preparation_time_in_min = preparation_time_in_min;
    this.description = description;
    this.availability = availability;
    this.state = "small";
  }
  clear()
  {
    this.id = null;
    this.title = "";
    this.price = null;
    this.photo = null;
    this.preparation_time_in_min = null;
    this.description = "";
    this.availability = null;
  }

 }
