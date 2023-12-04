import { useState } from 'react'
import { DetailsAnteproyecto } from '../../../models';

export const useCosultAnteproyecto = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openAproveModal, setOpenAproveModal] = useState(false);
  const [openFixedModal, setOpenFixedModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  
  
  const [currentAnteproyecto, setCurrentAnteproyecto] = useState<DetailsAnteproyecto>(null);

  const toggleDrawer = () => setOpenDrawer(!openDrawer);

  const handleLoadAnteproyecto = (anteproyecto: DetailsAnteproyecto) => {
    setCurrentAnteproyecto(anteproyecto);
  }

  
  return {
    openDrawer,
    openAproveModal,
    openFixedModal,
    openReviewModal,
    currentAnteproyecto,
    toggleDrawer,
    setOpenAproveModal,
    setOpenFixedModal,
    setOpenReviewModal,
    handleLoadAnteproyecto
  }
}
