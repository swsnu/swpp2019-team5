import chroma from "chroma-js";

export const itemOptions = [
    { value: "default", label: "Category", color: "#f1cfdf", isDisabled: true },
    { value: "Outer", label: "Outer", color: "#f1cfdf" },
    { value: "UpperBody", label: "UpperBody", color: "#f1cfdf" },
    { value: "LowerBody", label: "LowerBody", color: "#f1cfdf" },
    { value: "FullBody", label: "FullBody", color: "#f1cfdf" },
    { value: "Shoes", label: "Shoes", color: "#f1cfdf" },
    { value: "Accessories", label: "Accessories", color: "#f1cfdf" },
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
                ? color.alpha(0.3).css()
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

export const tagStyles = {};
