import "./CTextarea.css";

export const CTextarea = ({
    type,
    name,
    value,
    placeholder,
    onChange,
    className,
}) => {
    return (
        <CTextarea
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={className}
        />
    );
};