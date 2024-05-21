type QuantityLimits = {
    minimum: number;
    maximum: number;
    multiple_of: number;
    editable: boolean;
};

type Image = {
    id: number;
    src: string;
    thumbnail: string;
    srcset: string;
    sizes: string;
    name: string;
    alt: string;
};

type RawPrices = {
    precision: number;
    price: string;
    regular_price: string;
    sale_price: string;
};

type Prices = {
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: string | null;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    raw_prices: RawPrices;
};

type Totals = {
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
};

type Item = {
    key: string;
    id: number;
    quantity: number;
    quantity_limits: QuantityLimits;
    name: string;
    short_description: string;
    description: string;
    sku: string;
    low_stock_remaining: number | null;
    backorders_allowed: boolean;
    show_backorder_badge: boolean;
    sold_individually: boolean;
    permalink: string;
    images: Image[];
    variation: any[];
    item_data: any[];
    prices: Prices;
    totals: Totals;
    catalog_visibility: string;
    extensions: Record<string, any>;
};

type CouponTotals = {
    total_discount: string;
    total_discount_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
};

type Coupon = {
    code: string;
    discount_type: string;
    totals: CouponTotals;
};

type Address = {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
    email?: string;
};

type TaxLine = {
    name: string;
    price: string;
    rate: string;
};

type OrderTotals = {
    total_items: string;
    total_items_tax: string;
    total_fees: string;
    total_fees_tax: string;
    total_discount: string;
    total_discount_tax: string;
    total_shipping: string;
    total_shipping_tax: string;
    total_price: string;
    total_tax: string;
    tax_lines: TaxLine[];
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
};

type ShippingRateMetaData = {
    key: string;
    value: string;
};

type ShippingRate = {
    rate_id: string;
    name: string;
    description: string;
    delivery_time: string;
    price: string;
    taxes: string;
    instance_id: number;
    method_id: string;
    meta_data: ShippingRateMetaData[];
    selected: boolean;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
};

type ShippingRatePackageItem = {
    key: string;
    name: string;
    quantity: number;
};

type ShippingRatePackage = {
    package_id: number;
    name: string;
    destination: Address;
    items: ShippingRatePackageItem[];
    shipping_rates: ShippingRate[];
};

export type CartType = {
    items: Item[];
    coupons: Coupon[];
    fees: any[];
    totals: OrderTotals;
    shipping_address: Address;
    billing_address: Address;
    needs_payment: boolean;
    needs_shipping: boolean;
    payment_requirements: string[];
    has_calculated_shipping: boolean;
    shipping_rates: ShippingRatePackage[];
    items_count: number;
    items_weight: number;
    cross_sells: any[];
    errors: any[];
    payment_methods: string[];
    extensions: Record<string, any>;
};
