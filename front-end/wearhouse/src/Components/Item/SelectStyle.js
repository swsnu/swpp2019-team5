import chroma from "chroma-js";

export const itemOptions = [
    { value: "default", label: "Category", color: "#4ac7d8", isDisabled: true },
    { value: "Outer", label: "Outer", color: "#4ac7d8" },
    { value: "UpperBody", label: "UpperBody", color: "#4ac7d8" },
    { value: "LowerBody", label: "LowerBody", color: "#4ac7d8" },
    { value: "FullBody", label: "FullBody", color: "#4ac7d8" },
    { value: "Shoes", label: "Shoes", color: "#4ac7d8" },
    { value: "Accessories", label: "Accessories", color: "#4ac7d8" },
];

export const itemStyles = {
    control: styles => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled
                ? null
                : isSelected
                ? data.color
                : isFocused
                ? color.alpha(0.1).css()
                : null,

            color: "#666666",

            ":active": {
                ...styles[":active"],
                backgroundColor:
                    !isDisabled &&
                    (isSelected ? data.color : color.alpha(0.3).css()),
            },
        };
    },
    input: styles => ({ ...styles }),
    placeholder: styles => ({ ...styles }),
    singleValue: styles => ({ ...styles }),
};
