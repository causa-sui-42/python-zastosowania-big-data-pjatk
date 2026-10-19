/**
 * Schedule utilities for finding the closest lecture based on current date
 */

import type { Zajecia } from '../data/schedule';

/**
 * Parse a date string in DD.MM.YYYY format to a Date object
 */
function parsePolishDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Find the closest lecture to the current date.
 * 
 * Logic:
 * - If today is before all lectures, return the first lecture
 * - If today is after all lectures, return the last lecture
 * - Otherwise, return the next upcoming lecture (or current if today matches)
 */
export function findClosestLecture(schedule: Zajecia[]): Zajecia | null {
  if (schedule.length === 0) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  // Filter lectures that have an href (actual lecture content exists)
  const validLectures = schedule.filter(z => z.wykladHref);

  if (validLectures.length === 0) return null;

  // Find the first upcoming lecture (or current if today matches a lecture date)
  const upcomingLecture = validLectures.find(zajecia => {
    const lectureDate = parsePolishDate(zajecia.data);
    lectureDate.setHours(0, 0, 0, 0);
    return lectureDate >= today;
  });

  // If we found an upcoming lecture, return it
  if (upcomingLecture) {
    return upcomingLecture;
  }

  // All lectures are in the past, return the last valid one
  return validLectures[validLectures.length - 1];
}

/**
 * Get the link to the closest lecture
 */
export function getClosestLectureLink(schedule: Zajecia[], fallback: string = '/zaoczne/materialy/wyklady'): string {
  const closest = findClosestLecture(schedule);
  return closest?.wykladHref || fallback;
}
