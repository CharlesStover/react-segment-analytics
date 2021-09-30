import { useEffect } from 'react';
import ANALYTICS_WINDOW from '../../constants/analytics-window';
import type AddressTrait from '../../types/address-trait';
import type CompanyTrait from '../../types/company-trait';
import type IdentifyTraits from '../../types/identify-traits';
import type Traits from '../../types/traits';
import filterByUndefined from '../../utils/filter-by-undefined';
import mapValueToIsoDate from '../../utils/map-value-to-iso-date';
import mapValueToString from '../../utils/map-value-to-string';

const DEFAULT_ADDRESS_TRAIT: AddressTrait = Object.freeze({});
const DEFAULT_COMPANY_TRAIT: CompanyTrait = Object.freeze({});
const DEFAULT_TRAITS: Traits = Object.freeze({});

export default function useIdentify(
  traits: Readonly<Traits> | undefined,
): void {
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

    // If every trait is undefined, then do not identify this user.
    if (Object.values(identifyTraits).every(filterByUndefined)) {
      return;
    }

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
}
