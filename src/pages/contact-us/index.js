"use client"
import React, { useState } from 'react'
import TouchWithUs from '@/components/ContactUs/TouchWithUs';
import ContactUs from '@/components/ContactUs/ContactUs';
function Contactus() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 contactuscontainer'>
  <ContactUs/>
  <TouchWithUs/>

</div>

  )
}

export default Contactus