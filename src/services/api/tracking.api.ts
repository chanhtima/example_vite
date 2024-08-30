
import { Component } from "react";
import { http } from "./http";
import { trackingModel } from "../../models/tracking.model";


export default class TrackApi extends Component {
    static getAll(): Promise<{ projects: trackingModel[] }> {
      return http.get("/tracking");
    }
}