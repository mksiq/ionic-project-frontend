import { CityDTO } from "./city.dto";

export interface AddressDTO {
    id : string;
    number : string;
    streetName : string;
    unitNumber : string;
    postalCode : string;
    city : CityDTO;
}

