import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const TempSlider = withStyles({
    root: {
        color: "rgb(248, 81, 81)",
        width: 8,
        height: 150,
    },

    thumb: {
        height: 15,
        width: 15,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -8,
        "&:focus,&:hover,&$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + -5px)",
    },
    track: {
        borderRadius: 4,
    },
    rail: {
        borderRadius: 4,
    },
})(Slider);

export const marks = [
    {
        value: -30,
        label: "-30°C",
    },
    {
        value: 0,
        label: "0°C",
    },
    {
        value: 50,
        label: "50°C",
    },
];
