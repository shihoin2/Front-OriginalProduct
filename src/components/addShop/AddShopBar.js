'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import SearchBox from '@/components/mapPage/SearchBox'
import Button from '@/components/common/Button'
import AddShop from '../addShop/AddShop'
import { Modal, Box, Typography, TextField, IconButton } from '@mui/material'
import { IoIosClose } from 'react-icons/io'

const AddShopBar = ({ onClose }) => {
    const [selectedPlace, setSelectedPlace] = useState({
        name: '',
        address: '',
        lat: '',
        lng: '',
    })

    const handlePlaceSelect = place => {
        setSelectedPlace({
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        })
    }

    return (
        <Modal open={true} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography variant="h6" component="h2">
                        店舗を登録
                    </Typography>
                    <IconButton onClick={onClose}>
                        {/* <CloseIcon /> */}
                    </IconButton>
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Typography>店舗名で検索</Typography>
                    <SearchBox onPlaceSelect={handlePlaceSelect} />
                    <TextField
                        label="店舗名"
                        value={selectedPlace.name}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="住所"
                        value={selectedPlace.address}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <input type="hidden" value={selectedPlace.lat} />
                    <input type="hidden" value={selectedPlace.lng} />
                    <Button variant="contained" color="primary" fullWidth>
                        店舗を登録
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddShopBar
