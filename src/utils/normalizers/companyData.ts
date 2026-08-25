import type { PartnerProps } from "@/src/components/Company/PartnerCard";
import type { RegistrationProps } from "@/src/components/Company/StateRegistrationCard";
import type { CnaeData } from "@/src/components/Company/CnaeCard";

export function getPartners(
  socios: unknown
): PartnerProps[] {
  if (!Array.isArray(socios)) {
    return [];
  }

  return socios.filter(
    (socio): socio is PartnerProps =>
      typeof socio === "object" &&
      socio !== null &&
      !Array.isArray(socio)
  );
}
export function getStateRegistrations(
  registrations: unknown
): RegistrationProps[] {
  if (!Array.isArray(registrations)) {
    return [];
  }

  return registrations.filter(
    (registration): registration is RegistrationProps =>
      typeof registration === "object" &&
      registration !== null &&
      !Array.isArray(registration)
  );
}

export function getSecondaryActivities(
  activities: unknown
): CnaeData[] {
  if (!Array.isArray(activities)) {
    return [];
  }

  return activities.filter(
    (activity): activity is CnaeData =>
      typeof activity === "object" &&
      activity !== null &&
      !Array.isArray(activity)
  );
}