export type WaypointType = "pickup" | "delivery" | "PU" | "DL";

export interface Waypoint {
  id?: number;
  order?: number;
  location: string;
  address: string;
  waypoint_type: WaypointType;
}

export interface TransportOrder {
  id?: number;
  order_number: number;
  customer_name: string;
  date: string;
  waypoints: Waypoint[];
}
