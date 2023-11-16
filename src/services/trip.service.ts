import Trip, { ITrip } from "../models/trip.model";
import { visibility_status } from "../config/constants";

const saveTrip = async (payload: ITrip, user_id: string) => {
    payload.user = user_id;

    console.log(payload);

    const response = await Trip.create(payload);
    return response;
};

const getTripById = async (id: string) => {
    return await Trip.findById(id);
};

const getTripBySlug = async (slug: string) => {
    return await Trip.findOne({
        slug: slug,
        visibility_status: visibility_status.LIVE
    });
};


const updateTripById = async (id: string, data: any) => {
    return await Trip.findOneAndUpdate({ _id: id }, data, { new: true });
};

const deleteTripById = async (id: string) => {
    return await Trip.deleteOne({ _id: id });
};

const getUserTrips = async (user: string) => {
    return await Trip.find({ user }).sort({ createdAt: -1 });
};


export {
    saveTrip,
    getTripById,
    getTripBySlug,
    deleteTripById,
    updateTripById,
    getUserTrips,
};
