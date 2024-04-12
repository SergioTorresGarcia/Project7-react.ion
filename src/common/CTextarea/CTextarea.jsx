import "./CTextarea.css";

export const CTextarea = ({
    type,
    name,
    value,
    placeholder,
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
            placeholder={placeholder}
            // disabled={disabled}
            onChange={onChangeFunction}
            className={className}
        // maxLength={maxLength}
        />
    );
};