import React from 'react';
import { useLocalize } from '~/hooks';
import { useAuthContext } from '~/hooks/AuthContext';
import { useRecoilState } from 'recoil';
import { NotificationSeverity } from '~/common';
import { useToastContext } from '~/Providers';
import store from '~/store';
import type { TUser } from 'librechat-data-provider';

const locations = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'za', label: 'South Africa', icon: '🇿🇦' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'au', label: 'Australia', icon: '🇦🇺' },
  { value: 'in', label: 'India', icon: '🇮🇳' },
];

const LocationDropdown: React.FC = () => {
  const localize = useLocalize();
  const { user, token } = useAuthContext();
  const { showToast } = useToastContext();
  const [userState, setUserState] = useRecoilState(store.user);
  const [selectedLocation, setSelectedLocation] = React.useState<string>(userState?.location ?? 'us');

  // Fetch user's location when component mounts
  React.useEffect(() => {
    if (userState?.location) {
      setSelectedLocation(userState.location);
    }
  }, [userState?.location]);

  const handleLocationChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);

    try {
      const response = await fetch('/api/user/location', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ location: newLocation }),
      });

      if (!response.ok) {
        throw new Error('Failed to update location');
      }

      const data = await response.json();
      // Update the global user state with the new location
      if (userState) {
        const updatedUser: TUser = {
          ...userState,
          location: data.location,
        };
        setUserState(updatedUser);
        showToast({
          message: 'Successfully updated location!',
          severity: NotificationSeverity.SUCCESS,
        });
      }
    } catch (error) {
      showToast({
        message: 'Error updating location. Please try again later.',
        severity: NotificationSeverity.ERROR,
      });
      console.error('Error updating location:', error);
      setSelectedLocation(userState?.location ?? 'us');
    }
  };

  const selectedLocationData = locations.find(loc => loc.value === selectedLocation);

  return (
    <div className="flex items-center">
      <div className="relative">
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className="h-10 w-full appearance-none rounded-xl border border-border-light bg-surface-secondary px-3 py-2 pl-10 text-sm text-text-primary hover:bg-surface-tertiary focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label={localize('com_ui_select_jurisdiction')}
        >
          {locations.map((location) => (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          {selectedLocationData?.icon}
        </div>
      </div>
    </div>
  );
};

export default LocationDropdown;