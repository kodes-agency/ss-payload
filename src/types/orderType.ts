export type OrderData = {
    fees: any[];
    items: {
      key: string;
      id: number;
      type: string;
      quantity: number;
      quantity_limits: any;
      name: string;
      short_description: string;
      description: string;
      sku: string;
      low_stock_remaining: null | number;
      backorders_allowed: boolean;
      show_backorder_badge: boolean;
      sold_individually: boolean;
      permalink: string;
      images: any[];
      variation: any[];
      item_data: any[];
      prices: any;
      totals: any;
      catalog_visibility: string;
      extensions: any;
    }[];
    totals: {
      total_tax: string;
      tax_lines: any[];
      total_fees: string;
      total_items: string;
      total_price: string;
      currency_code: string;
      total_fees_tax: string;
      total_discount: string;
      total_shipping: string;
      total_items_tax: string;
      currency_symbol: string;
      currency_prefix: string;
      currency_suffix: string;
      total_discount_tax: string;
      total_shipping_tax: string;
      currency_minor_unit: number;
      currency_decimal_separator: string;
      currency_thousand_separator: string;
    };
    errors: any[];
    coupons: any[];
    extensions: any;
    items_count: number;
    cross_sells: any[];
    items_weight: number;
    needs_payment: boolean;
    needs_shipping: boolean;
    shipping_rates: {
      package_id: number;
      name: string;
      destination: any;
      items: any[];
      shipping_rates: any[];
    }[];
    billing_address: {
      city: string;
      state: string;
      email: string;
      phone: string;
      company: string;
      country:
    | 'AL'
    | 'AD'
    | 'AT'
    | 'BY'
    | 'BE'
    | 'BA'
    | 'BG'
    | 'HR'
    | 'CY'
    | 'CZ'
    | 'DK'
    | 'EE'
    | 'FI'
    | 'FR'
    | 'DE'
    | 'GR'
    | 'HU'
    | 'IS'
    | 'IE'
    | 'IT'
    | 'XK'
    | 'LV'
    | 'LI'
    | 'LT'
    | 'LU'
    | 'MT'
    | 'MD'
    | 'MC'
    | 'ME'
    | 'NL'
    | 'MK'
    | 'NO'
    | 'PL'
    | 'PT'
    | 'RO'
    | 'RU'
    | 'SM'
    | 'RS'
    | 'SK'
    | 'SI'
    | 'ES'
    | 'SE'
    | 'CH'
    | 'UA'
    | 'GB'
    | 'VA';
      postcode: string;
      last_name: string;
      address_1: string;
      address_2: string;
      first_name: string;
    };
    payment_methods: string;
    shipping_address: {
      city: string;
      state: string;
      phone: string;
      company: string;
      country:
      | 'AL'
      | 'AD'
      | 'AT'
      | 'BY'
      | 'BE'
      | 'BA'
      | 'BG'
      | 'HR'
      | 'CY'
      | 'CZ'
      | 'DK'
      | 'EE'
      | 'FI'
      | 'FR'
      | 'DE'
      | 'GR'
      | 'HU'
      | 'IS'
      | 'IE'
      | 'IT'
      | 'XK'
      | 'LV'
      | 'LI'
      | 'LT'
      | 'LU'
      | 'MT'
      | 'MD'
      | 'MC'
      | 'ME'
      | 'NL'
      | 'MK'
      | 'NO'
      | 'PL'
      | 'PT'
      | 'RO'
      | 'RU'
      | 'SM'
      | 'RS'
      | 'SK'
      | 'SI'
      | 'ES'
      | 'SE'
      | 'CH'
      | 'UA'
      | 'GB'
      | 'VA';
      postcode: string;
      last_name: string;
      address_1: string;
      address_2: string;
      first_name: string;
    };
    payment_requirements: string[];
    has_calculated_shipping: boolean;
    customer_note: string;
    nonce: string;
    cartToken: string;
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
    country:
    | 'AL'
    | 'AD'
    | 'AT'
    | 'BY'
    | 'BE'
    | 'BA'
    | 'BG'
    | 'HR'
    | 'CY'
    | 'CZ'
    | 'DK'
    | 'EE'
    | 'FI'
    | 'FR'
    | 'DE'
    | 'GR'
    | 'HU'
    | 'IS'
    | 'IE'
    | 'IT'
    | 'XK'
    | 'LV'
    | 'LI'
    | 'LT'
    | 'LU'
    | 'MT'
    | 'MD'
    | 'MC'
    | 'ME'
    | 'NL'
    | 'MK'
    | 'NO'
    | 'PL'
    | 'PT'
    | 'RO'
    | 'RU'
    | 'SM'
    | 'RS'
    | 'SK'
    | 'SI'
    | 'ES'
    | 'SE'
    | 'CH'
    | 'UA'
    | 'GB'
    | 'VA';
    email?: string;
    phone?: string;
  };
  
  type MetaData = {
    id: number;
    key: string;
    value: string;
  };
  
  type LineItem = {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    tax_class: string;
    subtotal: string;
    subtotal_tax: string;
    total: string;
    total_tax: string;
    taxes: Array<{ id: number; total: string; subtotal: string }>;
    meta_data: MetaData[];
    sku: string;
    price: number;
  };
  
  type TaxLine = {
    id: number;
    rate_code: string;
    rate_id: number;
    label: string;
    compound: boolean;
    tax_total: string;
    shipping_tax_total: string;
    meta_data: MetaData[];
  };
  
  type ShippingLine = {
    id: number;
    method_title: string;
    method_id: string;
    total: string;
    total_tax: string;
    taxes: any[];
    meta_data: MetaData[];
  };
  
  type Link = {
    href: string;
  };
  
  export type OrderResponse = {
    id: number;
    parent_id: number;
    number: string;
    order_key: string;
    created_via: string;
    version: string;
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
    currency: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    discount_total: string;
    discount_tax: string;
    shipping_total: string;
    shipping_tax: string;
    cart_tax: string;
    total: string;
    total_tax: string;
    prices_include_tax: boolean;
    customer_id: number;
    customer_ip_address: string;
    customer_user_agent: string;
    customer_note: string;
    billing: Address;
    shipping: Address;
    payment_method: string;
    payment_method_title: string;
    transaction_id: string;
    date_paid: string;
    date_paid_gmt: string;
    date_completed: string | null;
    date_completed_gmt: string | null;
    cart_hash: string;
    meta_data: MetaData[];
    line_items: LineItem[];
    tax_lines: TaxLine[];
    shipping_lines: ShippingLine[];
    fee_lines: any[];
    coupon_lines: any[];
    refunds: any[];
    _links: {
      self: Link[];
      collection: Link[];
    };
  };

  