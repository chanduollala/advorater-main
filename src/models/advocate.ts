export class Customer {
  id?: number;
  username?: string;
  password?: string;
  user_type?: string = 'C';
  name?: string
  phone1?: string


  constructor(obj: any) {
    this.id = obj.id
    this.username = obj.username
    this.user_type = obj.user_type
    this.name = obj.user_detail.name.first_name
    this.phone1 = obj.user_detail.contact_detail.phone1
  }
}

export class UserDetail {
  id?: number;
  name?: {
    id: number
    first_name: string;
    middle_name: string;
    last_name: string;
  }
  address_attributes?: Address
  contact_detail_attributes?: {
    id: number
    phone1: bigint;
    phone2: bigint;
    landline: bigint;
    contact_email: string;
  }
  dob?: Date
  gender?: string;
  image: any
  id_proof_attributes?: Document
}

export class Address {
  id?: any;
  door_no?: string
  street?: string
  pincode?: string
  address_type?: string;
  city_id?: number
  city?: {
    id: number
    city_name: string;
    state_id: string;
  }

  constructor(json: any) {
    this.id = json.id;
    this.door_no = json.door_no;
    this.street = json.street;
    this.pincode = json.pincode;
    this.address_type = json.address_type;
    this.city_id = json.city_id
    if (json.city?.id)
      this.city = {
        id: json.city.id,
        city_name: json.city.city_name,
        state_id: json.city.state_id
      };
  }
}

export class Document {
  id?: number
  document_number?: string
  document_type_id?: number
  file: any
}

export class Tag {
  id?: number
  title?: string
  tag_type_id?: number

  constructor(json: any) {
    this.id = json.id
    this.title = json.title
    this.tag_type_id = json.tag_type_id
  }
}


export class Advocate {
  id?: number;
  bio?: string
  is_verified?: boolean;
  career_start_year?: number;
  form_number?: string;
  rating?: number;
  advocate_tags?: Tag[] = []
  consultation_fee?: number
  operational_city?: {
    city_name?: string
    state?: string
  }
  office_address?: Address
  home_address?: Address
  username?: string;
  password?: string;
  user_type?: string = 'C';
  first_name?: string
  middle_name?: string
  last_name?: string
  phone1?: string
  phone2?: string
  dob?: string
  gender?: string
  image: any
  payments: {
    id?: number
    payment_id?: string;
    amount?: number;
    updated_at?: string;
    order_id?: string;
    signature?: string;
    is_success?: string,
    payment_method? :string
  }[] =[]

  interactions: {
    id?: number
    advocate_id?: number;
    user_id?: number;
    message?: string;
    interaction_type?: number;
    updated_at?: string
  }[] =[]


  bar_registration_number?: string
  bar_registration_file?: any;
  id_proof_number?: string;
  id_proof_file?: string;
  id_proof_type?: string;
  id_proof_type_id?: number
  payment_done?: boolean =false;



  bar_registration_id?: number
  id_proof_id?:number
  user_id?: number;
  name_id?: number;
  contact_detail_id?:number;
  user_detail_id?: number;
  address_id?:number
  office_address_id? : number;
  operational_city_id: any;



  private interaction_types: any= {
    1: 'Appointment Request',
    2: 'Consultation',
    3: 'Feedback'
  };





  constructor(json: any, is_complete = false) {

    this.id = json.id

    //user
    this.user_id = json.user_id
    this.username = json.user?.username
    this.user_type = json.user?.user_type
    this.password = json.user?.password_digest

    //user_details

    this.user_detail_id = json.user?.user_detail?.id

    //name
    this.name_id = json.user?.user_detail?.name?.id
    this.first_name = json.user?.user_detail?.name?.first_name
    this.middle_name = json.user?.user_detail?.name?.middle_name
    this.last_name = json.user?.user_detail?.name?.last_name

    //contact_detail
    this.contact_detail_id = json.user?.user_detail?.contact_detail?.id
    this.phone1 = json.user?.user_detail?.contact_detail?.phone1
    this.phone2 = json.user?.user_detail?.contact_detail?.phone2

    this.dob = json.user?.user_detail?.dob
    if (json.user?.user_detail?.gender == 'M')
      this.gender = 'Male'
    else if (json.user?.user_detail?.gender == 'F')
      this.gender = 'Female'
    else
      this.gender = 'Prefer not to say'
    this.image = json.user?.user_detail?.image
    this.home_address = (json.user?.user_detail?.address)?new Address(json.user?.user_detail?.address): undefined


    this.is_verified = json.is_verified
    this.office_address = (json.office_address)?new Address(json.office_address): undefined
    this.form_number = json.form_number
    this.consultation_fee = json.consultation_fee
    this.operational_city_id = json.operational_city_id
    this.operational_city= {
      city_name:  json.operational_city.city_name,
      state: json.operational_city.state.name
    }
    this.career_start_year = json.career_start_year

    //bar reg proof
    this.bar_registration_id = json.bar_registration?.id
    this.bar_registration_number = json.bar_registration?.document_number
    this.bar_registration_file = json.bar_registration?.file


    //id proof
    this.id_proof_id = json.user?.user_detail?.id_proof?.id
    this.id_proof_file = json.user?.user_detail?.id_proof?.file
    this.id_proof_number = json.user?.user_detail.id_proof?.document_number
    this.id_proof_type_id = json.user?.user_detail?.id_proof?.document_type_id
    this.id_proof_type = json.user?.user_detail?.id_proof?.document_type.document_type


    this.bio = json.bio
    this.rating = json.rating


    if (json.advocate_tags) {
      for (let x = 0; x < json.advocate_tags.length; x++) {
        let s = new Tag(json.advocate_tags[x].tag)
        this.advocate_tags?.push(s)
      }
    }

    if (json.user?.payments?.length>0){
      for (let i=0; i<json.user.payments.length;i++){
        this.payments.push({
          id: json.user?.payments[i]?.id,
          payment_id: json.user?.payments[i]?.payment_id,
          is_success:json.user?.payments[i]?.is_success,
          amount: json.user?.payments[i]?.amount,
          updated_at: json.user?.payments[i]?.updated_at,
          order_id: json.user?.payments[i]?.order_id,
          signature: json.user?.payments[i]?.signature,
          payment_method: json.user?.payments[i]?.signature,
        })
      }


      if (json.advocate_customer_interactions?.length>0) {
        for (let i = 0; i < json.advocate_customer_interactions.length; i++) {
          this.interactions.push({
            id: json.advocate_customer_interactions[i]?.id,
            advocate_id: json.advocate_customer_interactions[i]?.advocate_id,
            user_id: json.advocate_customer_interactions[i]?.user_id,
            message: json.advocate_customer_interactions[i]?.message,
            interaction_type: this.interaction_types[json.advocate_customer_interactions[i]?.interaction_type],
            updated_at: new Date(json.advocate_customer_interactions[i]?.updated_at).toString()
          })
        }
      }
      for (let i=0; i<json.user.payments.length;i++){
        if(json.user.payments[i].is_success){
          this.payment_done = true;
          break
        }
      }
    }
  }
}


