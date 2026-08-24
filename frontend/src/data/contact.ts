export const contactInfo = {
  email: "neobytech.ai@gmail.com",
  phone: "+226 73528252",
  phoneHref: "+22673528252",
  address: "Saaba, Ouagadougou, Burkina Faso",
  addressLines: ["Saaba", "Ouagadougou", "Burkina Faso"],
};

export interface ServiceOption {
  value: string;
  labelKey: string;
}

// The value is a stable key sent to the backend; the label is localized
// via `labelKey` at render time. Keys must stay in sync with
// SERVICE_LABELS in the backend contact route.
export const serviceOptions: ServiceOption[] = [
  { value: "ai-intelligent-systems", labelKey: "contact.services.ai" },
  { value: "software-digital-products", labelKey: "contact.services.software" },
  { value: "cloud-infrastructure", labelKey: "contact.services.cloud" },
  { value: "digital-commerce", labelKey: "contact.services.commerce" },
  { value: "other", labelKey: "contact.services.other" },
];
