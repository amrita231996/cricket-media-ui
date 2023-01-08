export function CIcon({ src, alt, fontSize, style, ...restProps }) {
    return (
        <img
            src={src}
            alt={alt || 'icon'}
            {...restProps}
            style={{
                cursor: 'pointer',
                width: fontSize,
                height: fontSize, ...style,
            }}
        />
    );
}