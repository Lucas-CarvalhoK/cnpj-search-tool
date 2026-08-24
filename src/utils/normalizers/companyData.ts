import type { PartnerCardProps } from "@/src/components/Company/PartnerCard";
import type { RegistrationProps } from "@/src/components/Company/StateRegistrationCard";
import type { CnaeCardProps } from "@/src/components/Company/CnaeCard";

export function getPartners(
  socios: unknown
): PartnerCardProps[] {
  if (!Array.isArray(socios)) {
    return [];
  }

  return socios.filter(
    (socio): socio is PartnerCardProps =>
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
): CnaeCardProps[] {
  if (!Array.isArray(activities)) {
    return [];
  }

  return activities.filter(
    (activity): activity is CnaeCardProps =>
      typeof activity === "object" &&
      activity !== null &&
      !Array.isArray(activity)
  );
}