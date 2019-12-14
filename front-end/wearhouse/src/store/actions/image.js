import * as actionTypes from "./actionTypes";
import axios from "axios";
import { push } from "connected-react-router";

var axiosConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};

export const postImage_ = outfit_metadata => {
    //console.log("outfit_metadata", outfit_metadata);
    return {
        type: actionTypes.POST_IMAGE,
        image: outfit_metadata.image,
        items:
            outfit_metadata.items.length >= 1
                ? outfit_metadata.items
                : [{ category: "default", tags: [] }],
    };
};

export const postImage = image => {
    return dispatch => {
        return (
            axios
                .post("/api/image/", image, axiosConfig)
                //.post("/api/image/", image)
                .then(res => {
                    //console.log(res.data);
                    dispatch(postImage_(res.data));
                })
                .catch(error => {
                    Promise.reject(error.response.data.message);
                })
                .then(() => dispatch(push("/createOutfit")))
                .catch(error => {
                    Promise.reject(error.response.data.message);
                    dispatch(push("/createOutfit"));
                })
        );
    };
};
