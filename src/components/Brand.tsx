type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <span className={compact ? "brand brand--compact" : "brand"} aria-label="fund me">
      <span aria-hidden="true">
        fu<span className="brand__hinge">dn</span>ME
      </span>
    </span>
  );
}
