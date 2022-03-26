export class Address {
    id?:number;
    address1?:string;
    address2?:string;
    city?:string;
    zipcode?:string;
    country?:string;
    constructor(
        address1?:string,
        address2?:string,
        city?:string,
        zipcode?:string,
        country?:string
    )
    {
        this.address1=address1;
        this.address2=address2;
        this.city=city;
        this.zipcode=zipcode;
        this.country=country;
    }
    clear()
    {
        this.address1="";
        this.address2="";
        this.city="";
        this.zipcode="";
        this.country="";
    }

    isValid():boolean
    {
        if(this.address1==null||this.address1==undefined||this.address1.trim()=="")
            return false;
        if(this.city==null||this.city==undefined||this.city.trim()=="")
            return false;
        if(this.zipcode==null||this.zipcode==undefined||this.zipcode.trim()=="")
            return false;
        return true;
    }
}