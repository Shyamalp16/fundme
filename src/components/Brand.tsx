type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <span className={compact ? "brand brand--compact" : "brand"} aria-label="fund me">
      <span aria-hidden="true">
        fun<span className="brand__hinge">(d)</span>ME
      </span>
    </span>
  );
}
