import { useCallback, useEffect } from 'react';
import ANALYTICS_WINDOW from '../../constants/analytics-window';
import type AddressTrait from '../../types/address-trait';
import type CompanyTrait from '../../types/company-trait';
import type IdentifyTraits from '../../types/identify-traits';
import type SegmentTrack from '../../types/segment-track';
import type Traits from '../../types/traits';
import filterByUndefined from '../../utils/filter-by-undefined';
import init from '../../utils/init';
import mapValueToIsoDate from '../../utils/map-value-to-iso-date';
import mapValueToString from '../../utils/map-value-to-string';

interface Props {
  readonly eventPrefix: string | undefined;
  readonly traits: Traits | undefined;
  readonly writeKey: string;
}

interface State {
  readonly track: SegmentTrack;
}

const DEFAULT_ADDRESS_TRAIT: AddressTrait = Object.freeze({});
const DEFAULT_COMPANY_TRAIT: CompanyTrait = Object.freeze({});
const DEFAULT_TRAITS: Traits = Object.freeze({});

export default function useSegment({
  eventPrefix,
  traits,
  writeKey,
}: Props): State {
  const {
    address,
    age,
    avatar,
    birthday,
    company,
    createdAt,
    description,
    email,
    firstName,
    gender,
    id,
    lastName,
    name,
    phone,
    title,
    username,
    website,
  } = traits ?? DEFAULT_TRAITS;

  const {
    city: addressCity,
    country: addressCountry,
    postalCode: addressPostalCode,
    state: addressState,
    street: addressStreet,
  } = address ?? DEFAULT_ADDRESS_TRAIT;

  const {
    employeeCount: companyEmployeeCount,
    id: companyId,
    industry: companyIndustry,
    name: companyName,
    plan: companyPlan,
  } = company ?? DEFAULT_COMPANY_TRAIT;

  // Effects
  useEffect((): VoidFunction => {
    init(writeKey);
    return (): void => {
      delete ANALYTICS_WINDOW.analytics;
    };
  }, [writeKey]);

  useEffect((): void => {
    if (typeof ANALYTICS_WINDOW.analytics === 'undefined') {
      return;
    }

    const getAddress = (): AddressTrait | undefined => {
      const addressSubtraits: unknown[] = [
        addressCity,
        addressCountry,
        addressPostalCode,
        addressState,
        addressStreet,
      ];

      // If every address sub-trait is undefined, then set the whole address trait
      //   to undefined.
      if (addressSubtraits.every(filterByUndefined)) {
        return;
      }

      return {
        city: addressCity,
        country: addressCountry,
        postalCode: addressPostalCode,
        state: addressState,
        street: addressStreet,
      };
    };

    const getCompany = (): CompanyTrait | undefined => {
      const companySubtraits: unknown[] = [
        companyEmployeeCount,
        companyId,
        companyIndustry,
        companyName,
        companyPlan,
      ];

      // If every address sub-trait is undefined, then set the whole address trait
      //   to undefined.
      if (companySubtraits.every(filterByUndefined)) {
        return;
      }

      return {
        employeeCount: companyEmployeeCount,
        id: companyId,
        industry: companyIndustry,
        name: companyName,
        plan: companyPlan,
      };
    };

    const identifyId: string | undefined = mapValueToString(id);
    const identifyTraits: IdentifyTraits = {
      address: getAddress(),
      age,
      avatar,
      birthday: mapValueToIsoDate(birthday),
      company: getCompany(),
      createdAt: mapValueToIsoDate(createdAt),
      description,
      email,
      firstName,
      gender,
      id: identifyId,
      lastName,
      name,
      phone: mapValueToString(phone),
      title,
      username,
      website,
    };

    ANALYTICS_WINDOW.analytics.identify(identifyId, identifyTraits);
  }, [
    addressCity,
    addressCountry,
    addressPostalCode,
    addressState,
    addressStreet,
    age,
    avatar,
    birthday,
    companyEmployeeCount,
    companyId,
    companyIndustry,
    companyName,
    companyPlan,
    createdAt,
    description,
    email,
    firstName,
    gender,
    id,
    lastName,
    name,
    phone,
    title,
    username,
    website,
  ]);

  return {
    track: useCallback(
      (
        event: string,
        properties?: Record<string, unknown>,
        options?: unknown,
        callback?: () => void,
      ): void => {
        if (typeof ANALYTICS_WINDOW.analytics === 'undefined') {
          return;
        }

        const getEvent = (): string => {
          if (typeof eventPrefix === 'string') {
            return `${eventPrefix} ${event}`;
          }
          return event;
        };

        ANALYTICS_WINDOW.analytics.track(
          getEvent(),
          properties,
          options,
          callback,
        );
      },
      [eventPrefix],
    ),
  };
}
