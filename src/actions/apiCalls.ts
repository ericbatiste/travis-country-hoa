import { browserClient } from "@/utils/supabase/client"
import { serverClient } from "@/utils/supabase/server"

export const postUserRegistration = async (formData: FormData) => {
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

export const getPendingUsers = async () => {
  try {
    const supabase = browserClient();
    
    const { data: users, error } = await supabase
    .from('users')
    .select('id, first_name, last_name, email, address, status')
    .eq('status', 'pending');
    
    if (error) throw new Error();
    
    return users || [];
  } catch (error) {
    console.error('Error retrieving data:', error);
    return [];
  }
}

export const getAdmins = async () => {
  try {
    const supabase = browserClient();

    const { data: users, error } = await supabase
    .from('users')
    .select('email')
    .eq('admin', true);

    const admins = users?.map(user => user.email)

    if (error) throw error

    return admins
  } catch (error) {
    console.log(error);
  }
}

export const updateUserStatus = async (email: string, updatedStatus: string) => {
  try {
    const supabase = browserClient()

    const { data, error } = await supabase
      .from('users')
      .update({ status: updatedStatus })
      .eq('email', email)

    if (error) throw error

    console.log(data)
  } catch (error) {
    console.log(error)
  }
}