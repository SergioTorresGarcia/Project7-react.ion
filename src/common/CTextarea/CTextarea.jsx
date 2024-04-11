import "./CTextarea.css";

export const CTextarea = ({
    type,
    name,
    value,
    // disabled,
    onChangeFunction,
    className,
    // maxLength,
}) => {
    return (
        <textarea
            type={type}
            name={name}
            value={value}
            // disabled={disabled}
            onChange={onChangeFunction}
            className={className}
        // maxLength={maxLength}
        />
    );
};