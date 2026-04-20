import { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../constants/data';
import { supabase } from '../lib/supabase';

export const useADSConfig = () => {
  const getDefaultConfig = () => ({
    heroSubtitle: "PROFESSIONAL DIGITAL SERVICES",
    mainHeadline: "Engineered for Scale.",
    aboutText: BUSINESS_INFO.aboutBio,
    email: BUSINESS_INFO.email,
    phone: BUSINESS_INFO.phone,
    address: BUSINESS_INFO.address,
    whatsapp: BUSINESS_INFO.whatsappUrl,
    ntn: BUSINESS_INFO.ntn,
    accentColor: "#00f0ff",
    theme: "dark"
  });

  const [config, setConfig] = useState(getDefaultConfig());

  useEffect(() => {
    async function fetchConfig() {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('*')
          .single();
        
        if (!error && data) {
          setConfig(data.config_payload);
        } else if (error && error.code === 'PGRST116') {
          // Table exists but no row found, or table doesn't exist yet
          console.warn("CMS Node: No remote config found. Using default architecture.");
        }
      } catch (err) {
        console.error("CMS Sync Error:", err);
      }
    }

    fetchConfig();

    const handleUpdate = () => {
      fetchConfig();
    };

    window.addEventListener('ads_config_update', handleUpdate);
    return () => window.removeEventListener('ads_config_update', handleUpdate);
  }, []);

  return config;
};
