import React from 'react';
import DetailsView from '@/features/details/details.view';
import { useDetailsViewModel } from '@/features/details/details.view-model';

export default function DetailsScreen() {
    const viewModel = useDetailsViewModel();
    return <DetailsView {...viewModel} />;
}
