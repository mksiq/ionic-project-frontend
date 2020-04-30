import { ProvinceDTO } from "./province.dto";

export interface CityDTO {
    id : string;
    name : string;
    province? : ProvinceDTO;
}