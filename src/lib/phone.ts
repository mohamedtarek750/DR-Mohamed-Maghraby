/**
 * Egyptian mobile numbers are published in local form (01142009433). Links
 * use the international form so they dial correctly from abroad too, which
 * matters because online consultations are open to patients outside Egypt.
 */

/** 01142009433 -> tel:+201142009433 */
export const telHref = (local: string) => `tel:+2${local}`;

/** 01142009433 -> 0114 200 9433, the grouping people read these numbers in. */
export const formatPhone = (local: string) =>
  `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
