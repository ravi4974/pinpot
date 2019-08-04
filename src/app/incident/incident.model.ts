export interface Severity {
    code: number ;
    imageUrl: string ;
    text: string;
}

export interface Address {
    road: string;
    landmark: string;
    area: string;
    city: string;
}

export interface Location {
    longitude: number;
    latitude: number;
}

export interface Incident {
    id: string;
    severity: Severity;
    address: Address;
    location?: Location;
    image?: string;
}
