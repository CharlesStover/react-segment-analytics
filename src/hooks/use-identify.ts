import { useEffect } from 'react';
import type AddressTrait from '../types/address-trait';
import type AnalyticsWindow from '../types/analytics-window';
import type CompanyTrait from '../types/company-trait';
import type IdentifyTraits from '../types/identify-traits';
import type Traits from '../types/traits';
import filterByUndefined from '../utils/filter-by-undefined';
import getAnalyticsWindow from '../utils/get-analytics-window';
import mapValueToIsoDate from '../utils/map-value-to-iso-date';
import mapValueToString from '../utils/map-value-to-string';
import parseStringifiedObject from '../utils/parse-stringified-object';

const DEFAULT_ADDRESS_TRAIT: AddressTrait = Object.freeze({});
const DEFAULT_COMPANY_TRAIT: CompanyTrait = Object.freeze({});
const DEFAULT_TRAITS: Traits = Object.freeze({});

export default function useIdentify(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
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
    ...restTraits
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

  // Stringify remaining traits so that `useEffect`'s memoization array can
  //   check for deep equality.
  const restTraitsStringified: string = JSON.stringify(restTraits);

  useEffect((): void => {
    const analyticsWindow: AnalyticsWindow = getAnalyticsWindow();
    if (typeof analyticsWindow.analytics === 'undefined') {
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

    // We must use `object` as a return type here instead of
    //   `Record<string, unknown>`, because the parsed value does not have an
    //   index signature.
    // eslint-disable-next-line @typescript-eslint/ban-types
    const restTraitsParsed: object = parseStringifiedObject(
      restTraitsStringified,
    );

    const identifyTraits: IdentifyTraits = {
      ...restTraitsParsed,
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

    analyticsWindow.analytics.identify(identifyId, identifyTraits);
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
    restTraitsStringified,
    title,
    username,
    website,
  ]);
}
