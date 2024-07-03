

import { browserClient } from "@/utils/supabase/client"

export async function postUserRegistration(formData: FormData) {
  const supabase = browserClient()
  
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const address = formData.get('address') as string
  
  const { data, error } = await supabase
    .from('users')
    .insert([
      { 
        first_name: firstName,
        last_name: lastName,
        email: email,
        address: address 
      }
    ])

    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
}

export async function getUserRegistrations() {
  try {
    const supabase = browserClient();
    
    const { data: users, error } = await supabase
      .from('users')
      .select('id, first_name, last_name, email, address, status')
      .eq('status', 'pending');

    if (error) throw new Error();

    console.log(users)

    return users || [];
  } catch (error) {
    console.error('Error retrieving data:', error);
    return [];
  }
}