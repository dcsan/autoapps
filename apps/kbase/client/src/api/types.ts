// defining the types that come back from the API

export type User = {
  name: string;
  id: string;
  balance: number;
  deck?: IUserCard[];
};

export type TUser = Partial<User>;
export type FusionSteps = "" | "target" | "fodder";

export type IUserCard = {
  id: string;
  level: number;
  progress: number;
  price: number;
  eav?: number;
  baseCard: BaseCard;
  owner: User;
  mode?: FusionSteps;
};

export type BaseCard = {
  id: string;
  name: string;
  imageId: number;
  price: number;
  imageUrl: string;
  creatorId?: string;
  creator?: User;
  rarity: string;
};

export type IBid = {
  id: string;
  amount: number;
  auction: any;
  user: any;
};

export type IFieldValueProps = {
  name: string;
  value: string | number | undefined;
  width?: number;
  unit?: string;
};

export type IDateField = {
  name: string;
  date: Date;
  width?: number;
};

export type Auction = {
  id: string;
  creator: User;
  createdAt: Date;
  endsAt: Date;
  lastBidAmount: number;
  bids?: IBid[];
  status: string;
  userCard?: IUserCard;
  winner?: User;
};

export type AuctionResult = {
  success: boolean;
  data?: Auction;
};

// API response types

export type IBidResult = {
  success: boolean;
  data?: {
    bids: IBid[];
  };
};

export type Fusion = {
  status: {
    step: number;
    mode: FusionSteps;
    message: string;
  };
  user: User;
};

export type FusionApi = {
  success: boolean;
  data?: Fusion;
};
